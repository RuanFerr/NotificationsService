import { Content } from './Content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Strength build is better than dex build');

    expect(content).toBeTruthy();
  });

  it('should no be able to create a notification content with less than 5 characters', () => {
    expect(() => {
      new Content('bonk');
    }).toThrow();
  });

  it('should no be able to create a notification content with more than 240 characters', () => {
    expect(() => {
      new Content('bonk'.repeat(61));
    }).toThrow();
  });
});
