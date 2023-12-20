import { Test, TestingModule } from '@nestjs/testing';
import DiscountRuleController from './discount-rule.controller';
import DiscountRuleService from '../../../domain/discount-rule.service';
import { DicountRuleRequest } from './discount-rule-request';
import { PaginationParam } from 'src/common/pagination';
import DiscountRule, {
  RuleType,
} from 'src/product/entity/discount-rule.entity';
import Product from 'src/product/entity/product.entity';

describe('DiscountRuleController', () => {
  let controller: DiscountRuleController;
  let service: DiscountRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountRuleController],
      providers: [
        {
          provide: DiscountRuleService,
          useValue: {
            create: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DiscountRuleController>(DiscountRuleController);
    service = module.get<DiscountRuleService>(DiscountRuleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a discount rule', async () => {
      const productId = 1;
      const request: DicountRuleRequest = Object.assign(
        new DicountRuleRequest(),
        {
          ruleType: 'BULK',
          triggerQuantity: 2,
          discountValue: '10',
          discountProduct: 1,
          minPurchaseAmount: 100,
        },
      );
      jest.spyOn(service, 'create').mockResolvedValue({
        id: 1,
        ruleType: RuleType.BULK_DISCOUNT,
        triggerQuantity: 2,
        discountValue: 10,
        discountProduct: {
          id: 1,
        } as Product,
        minPurchaseAmount: 100,
        triggerProduct: {
          id: 1,
        } as Product,
        description: 'some description',
      } as DiscountRule);

      await controller.create(productId, request);

      expect(service.create).toHaveBeenCalledWith(
        productId,
        request.toEntity(),
      );
    });
  });

  describe('edit', () => {
    it('should update a discount rule', async () => {
      const productId = 1;
      const id = 1;

      const request: DicountRuleRequest = Object.assign(
        new DicountRuleRequest(),
        {
          ruleType: 'BULK',
          triggerQuantity: 2,
          discountValue: '10',
          discountProduct: 1,
          minPurchaseAmount: 100,
        },
      );
      jest.spyOn(service, 'edit').mockResolvedValue({
        id: 1,
        ruleType: RuleType.BULK_DISCOUNT,
        triggerQuantity: 2,
        discountValue: 10,
        discountProduct: {
          id: 1,
        } as Product,
        minPurchaseAmount: 100,
        triggerProduct: {
          id: 1,
        } as Product,
        description: 'some description',
      } as DiscountRule);

      await controller.edit(productId, id, request);

      expect(service.edit).toHaveBeenCalledWith(
        productId,
        id,
        request.toEntity(),
      );
    });
  });

  describe('delete', () => {
    it('should delete a discount rule', async () => {
      const productId = 1;
      const id = 1;

      jest.spyOn(service, 'delete').mockResolvedValue();

      await controller.delete(productId, id);

      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('findOne', () => {
    it('should return a single discount rule', async () => {
      const id = 1;
      jest.spyOn(service, 'findById').mockResolvedValue({
        id: 1,
        ruleType: RuleType.BULK_DISCOUNT,
        triggerQuantity: 2,
        discountValue: 10,
        discountProduct: {
          id: 1,
        } as Product,
        minPurchaseAmount: 100,
        triggerProduct: {
          id: 1,
        } as Product,
        description: 'some description',
      } as DiscountRule);

      await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should return an array of discount rules', async () => {
      const param: PaginationParam = { page: 1, size: 10 };
      jest.spyOn(service, 'findAll').mockResolvedValue({
        currentPage: 1,
        items: [
          {
            id: 1,
            ruleType: RuleType.BULK_DISCOUNT,
            triggerQuantity: 2,
            discountValue: 10,
            discountProduct: {
              id: 1,
            } as Product,
            minPurchaseAmount: 100,
            triggerProduct: {
              id: 1,
            } as Product,
            description: 'some description',
          } as DiscountRule,
        ],
        totalItems: 1,
        totalPages: 1,
      });

      await controller.findAll(param);

      expect(service.findAll).toHaveBeenCalledWith(param);
    });
  });
});
