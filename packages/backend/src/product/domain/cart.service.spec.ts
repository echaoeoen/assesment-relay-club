import { Test } from '@nestjs/testing';
import CartService from './cart.service';
import CartRepository from '../infrastructure/repository/cart.repository';
import ProductRepository from '../infrastructure/repository/product.repository';
import Cart from '../entity/cart.entity';
import Checkout from '../entity/checkout.entity';
import { RuleType } from '../entity/discount-rule.entity';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartRepository,
          useValue: {},
        },
        {
          provide: ProductRepository,
          useValue: {},
        },
      ],
    }).compile();

    cartService = moduleRef.get<CartService>(CartService);
  });

  describe('calculateDiscount', () => {
    it('should calculate the discount free bundled item to add free vga adapter with no price when discount rule is FREE_BUNDLED_ITEM', async () => {
      const checkouts: Checkout[] = [];
      await cartService.calculateDiscount(
        {
          id: 7,
          quantity: 5,
          user: { id: 2, username: 'string', password: '', name: 'string' },
          product: {
            id: 2,
            sku: 'mbp',
            name: 'Macbook Pro',
            price: 1399.99,
            discountRules: [
              {
                id: 3,
                ruleType: RuleType.FREE_BUNDLE_ITEM,
                triggerQuantity: null,
                discountValue: 3,
                description: 'Get free VGA Adapter for each Macbook Pro',
                minPurchaseAmount: null,
                validFrom: null,
                validUntil: null,
                discountProduct: {
                  id: 4,
                  sku: 'vga',
                  name: 'VGA Adapter',
                  price: 30,
                },
              },
            ],
          },
        } as Cart,
        checkouts,
      );
      expect(checkouts).toEqual([
        {
          discount: 0,
          discountDescription: 'Get free VGA Adapter for each Macbook Pro',
          price: 0,
          product: { id: 4, sku: 'vga', name: 'VGA Adapter', price: 30 },
          quantity: 5,
        },
        {
          discount: 0,
          discountDescription: '',
          price: 6999.95,
          product: {
            id: 2,
            sku: 'mbp',
            name: 'Macbook Pro',
            price: 1399.99,
            discountRules: [
              {
                id: 3,
                ruleType: 'FREE_BUNDLE_ITEM',
                triggerQuantity: null,
                discountValue: 3,
                description: 'Get free VGA Adapter for each Macbook Pro',
                minPurchaseAmount: null,
                validFrom: null,
                validUntil: null,
                discountProduct: {
                  id: 4,
                  sku: 'vga',
                  name: 'VGA Adapter',
                  price: 30,
                },
              },
            ],
          },
          quantity: 5,
        },
      ]);
    });
    it('should calculate the discount free bundled item to get additional free when discount rule is BUY_X_GET_Y_FREE', async () => {
      const c: Checkout[] = [];
      await cartService.calculateDiscount(
        {
          id: 5,
          quantity: 4,
          user: { id: 2, username: 'string', password: '', name: 'string' },
          product: {
            id: 3,
            sku: 'atv',
            name: 'Apple TV',
            price: 109.5,
            discountRules: [
              {
                id: 1,
                ruleType: RuleType.BUY_X_GET_Y_FREE,
                triggerQuantity: 2,
                discountValue: 1,
                description: 'Free 1 Apple TV for buying 2 Apple TV',
                minPurchaseAmount: null,
                validFrom: null,
                validUntil: null,
                discountProduct: null,
              },
            ],
          },
        } as Cart,
        c,
      );
      expect(c).toEqual([
        {
          discount: 109.5,
          discountDescription: 'Free 1 Apple TV for buying 2 Apple TV\n',
          price: 328.5,
          product: {
            id: 3,
            sku: 'atv',
            name: 'Apple TV',
            price: 109.5,
            discountRules: [
              {
                id: 1,
                ruleType: 'BUY_X_GET_Y_FREE',
                triggerQuantity: 2,
                discountValue: 1,
                description: 'Free 1 Apple TV for buying 2 Apple TV',
                minPurchaseAmount: null,
                validFrom: null,
                validUntil: null,
                discountProduct: null,
              },
            ],
          },
          quantity: 4,
        },
      ]);
    });
    it('should calculate the discount free bundled item to get discount when discount rule is BULK_DISCOUNT', async () => {
      const checkouts: Checkout[] = [];
      await cartService.calculateDiscount(
        {
          id: 7,
          quantity: 5,
          user: { id: 2, username: 'string', password: '', name: 'string' },
          product: {
            id: 2,
            sku: 'mbp',
            name: 'Macbook Pro',
            price: 1399.99,
            discountRules: [
              {
                id: 2,
                ruleType: RuleType.BULK_DISCOUNT,
                triggerQuantity: 4,
                discountValue: 499.99,
                description:
                  'Get $499.99 for each Macbook Pro for buying more than 4',
                minPurchaseAmount: null,
                validFrom: null,
                validUntil: null,
                discountProduct: null,
              },
            ],
          },
        } as Cart,
        checkouts,
      );
      expect(checkouts).toEqual([
        {
          discount: 2499.95,
          discountDescription:
            'Get $499.99 for each Macbook Pro for buying more than 4\n',
          price: 4500,
          product: {
            id: 2,
            sku: 'mbp',
            name: 'Macbook Pro',
            price: 1399.99,
            discountRules: [
              {
                id: 2,
                ruleType: 'BULK_DISCOUNT',
                triggerQuantity: 4,
                discountValue: 499.99,
                description:
                  'Get $499.99 for each Macbook Pro for buying more than 4',
                minPurchaseAmount: null,
                validFrom: null,
                validUntil: null,
                discountProduct: null,
              },
            ],
          },
          quantity: 5,
        },
      ]);
    });
  });
});
