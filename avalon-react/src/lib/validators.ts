// Validation functions for Avalon game

import { GAME_CONFIG, ROLES } from './game-rules';
import type { Player, ValidationResult } from '@/types/game.types';

export function validatePlayers(players: Player[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check player count
  if (players.length < GAME_CONFIG.minPlayers) {
    errors.push(`Need at least ${GAME_CONFIG.minPlayers} players (current: ${players.length})`);
  }
  if (players.length > GAME_CONFIG.maxPlayers) {
    errors.push(`Maximum ${GAME_CONFIG.maxPlayers} players allowed (current: ${players.length})`);
  }

  // Only validate role balance if we have valid player count
  if (players.length >= GAME_CONFIG.minPlayers && players.length <= GAME_CONFIG.maxPlayers) {
    // Check role balance
    const evilCount = players.filter(p => ROLES[p.role].alignment === 'Evil').length;
    const expectedEvil = GAME_CONFIG.evilCountByPlayers[players.length];

    if (evilCount !== expectedEvil) {
      errors.push(`Need exactly ${expectedEvil} evil players for ${players.length} players (current: ${evilCount})`);
    }

    // Check required roles
    const presentRoles = new Set(players.map(p => p.role));
    for (const requiredRole of GAME_CONFIG.requiredRoles) {
      if (!presentRoles.has(requiredRole)) {
        errors.push(`Required role missing: ${requiredRole}`);
      }
    }

    // Check duplicate roles
    const roleCounts = new Map<string, number>();
    for (const player of players) {
      roleCounts.set(player.role, (roleCounts.get(player.role) || 0) + 1);
    }

    for (const [role, count] of roleCounts.entries()) {
      if (count > 1 && !ROLES[role as keyof typeof ROLES].canDuplicate) {
        errors.push(`Role ${role} cannot be duplicated (found ${count})`);
      }
    }

    // Check for illogical setups (warnings)
    if (presentRoles.has('Perceival') && !presentRoles.has('Merlin')) {
      warnings.push('Perceival without Merlin is not recommended');
    }

    if (presentRoles.has('Perceival') && !presentRoles.has('Morgana')) {
      warnings.push('Perceival without Morgana makes the role less interesting');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validatePlayerName(name: string, existingPlayers: Player[]): ValidationResult {
  const errors: string[] = [];

  if (name.trim().length === 0) {
    errors.push('Name cannot be empty');
  }

  if (name.trim().length > 20) {
    errors.push('Name too long (max 20 characters)');
  }

  if (existingPlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    errors.push('Name already taken');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
}

export function toTitleCase(str: string): string {
  return str.replace(/^(\w)|(\s\w)/g, match => match.toUpperCase());
}
