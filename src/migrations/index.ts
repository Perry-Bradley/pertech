import * as migration_20260524_073035_initial from './20260524_073035_initial';

export const migrations = [
  {
    up: migration_20260524_073035_initial.up,
    down: migration_20260524_073035_initial.down,
    name: '20260524_073035_initial'
  },
];
