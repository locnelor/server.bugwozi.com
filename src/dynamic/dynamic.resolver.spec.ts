import { Test, TestingModule } from '@nestjs/testing';
import { DynamicResolver } from './dynamic.resolver';

describe('DynamicResolver', () => {
  let resolver: DynamicResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicResolver],
    }).compile();

    resolver = module.get<DynamicResolver>(DynamicResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
