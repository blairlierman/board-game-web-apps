import { PlayerStore } from './home.store';

describe('PlayerStore', () => {
  let store: PlayerStore;

  beforeEach(() => {
    store = new PlayerStore();
  });

  it('should initialize with two players at 50 health', (done) => {
    store.players$.subscribe((players) => {
      expect(players).toBeDefined();
      expect(players.length).toBe(2);
      expect(players[0]).toEqual({ playerId: 1, health: 50 });
      expect(players[1]).toEqual({ playerId: 2, health: 50 });
      done();
    });
  });

  it('should update only the selected player health', (done) => {
    store.updatePlayer({ playerId: 2, health: 10 });

    store.players$.subscribe((players) => {
      expect(players.find((p) => p.playerId === 1)?.health).toBe(50);
      expect(players.find((p) => p.playerId === 2)?.health).toBe(10);
      done();
    });
  });

  it('should select a player by id', (done) => {
    store.selectPlayer(1).subscribe((player) => {
      expect(player).toEqual({ playerId: 1, health: 50 });
      done();
    });
  });

  it('should return undefined when selecting a missing player', (done) => {
    store.selectPlayer(999).subscribe((player) => {
      expect(player).toBeUndefined();
      done();
    });
  });
});
