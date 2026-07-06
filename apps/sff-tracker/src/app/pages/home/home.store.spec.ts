import { PlayerStore } from './home.store';

describe('PlayerStore', () => {
  let store: PlayerStore;

  beforeEach(() => {
    store = new PlayerStore();
  });

  it('should initialize with two players at 50 health', () => {
    const players = store.players();

    expect(players).toBeDefined();
    expect(players.length).toBe(2);
    expect(players[0]).toEqual({ playerId: 1, health: 50 });
    expect(players[1]).toEqual({ playerId: 2, health: 50 });
  });

  it('should update only the selected player health', () => {
    store.updatePlayer({ playerId: 2, health: 10 });

    const players = store.players();

    expect(players.find((p) => p.playerId === 1)?.health).toBe(50);
    expect(players.find((p) => p.playerId === 2)?.health).toBe(10);
  });

  it('should select a player by id', () => {
    expect(store.selectPlayer(1)()).toEqual({ playerId: 1, health: 50 });
  });

  it('should return undefined when selecting a missing player', () => {
    expect(store.selectPlayer(999)()).toBeUndefined();
  });
});
