import { describe, it, expect, vi } from 'vitest';
import { Logger } from '../../utils/logger';

describe('Logger', () => {

  it('should call console.error when Logger.error is used', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    Logger.error('Test error', []);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should call console.log when Logger.info is used', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    Logger.info('Info message');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

});