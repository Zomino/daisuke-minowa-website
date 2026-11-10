import * as migration_20261110_082116_initial from './20261110_082116_initial';

export const migrations = [
  {
    up: migration_20261110_082116_initial.up,
    down: migration_20261110_082116_initial.down,
    name: '20261110_082116_initial'
  },
];
