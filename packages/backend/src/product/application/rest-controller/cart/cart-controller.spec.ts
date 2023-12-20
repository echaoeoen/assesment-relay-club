import { Test, TestingModule } from '@nestjs/testing';
import CartController from './cart-controller';
import CartService from 'src/product/domain/cart.service';
import { AddToCartRequest } from './cart-request';
import SessionData from 'src/common/session';
import User from 'src/user/entity/user.entity';
import Checkout from 'src/product/entity/checkout.entity';
import Product from 'src/product/entity/product.entity';

describe('CartController', () => {
  let cartController: CartController;
  let mockCartService: Partial<CartService>;

  beforeEach(async () => {
    mockCartService = {
      addToCart: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      checkout: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compile();

    cartController = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
  });

  describe('addToCart', () => {
    it('should call cartService.addToCart with the right parameters', async () => {
      const request: AddToCartRequest = { productId: 1, quantity: 2 };
      await cartController.addToCart(request);
      expect(mockCartService.addToCart).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('findAll', () => {
    it('should return an array of cart items', async () => {
      const mockResponse = [];
      jest.spyOn(mockCartService, 'findAll').mockResolvedValue(mockResponse);
      expect(await cartController.findAll()).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should call cartService.delete with the right productId', async () => {
      const productId = 1;
      const mockSession: SessionData = {
        user: { id: 1, name: 'name' } as User,
      };
      await cartController.delete(productId, mockSession);
      expect(mockCartService.delete).toHaveBeenCalledWith(productId);
    });
  });

  describe('getCheckout', () => {
    it('should return checkout data', async () => {
      const mockCheckoutData: Checkout[] = [
        {
          discount: 0,
          price: 100,
          quantity: 2,
          product: {
            discountRules: [],
            id: 1,
            name: 'name',
            price: 100,
            sku: 'sku',
          } as Product,
        } as Checkout,
      ];
      jest
        .spyOn(mockCartService, 'checkout')
        .mockResolvedValue(mockCheckoutData);
      expect(await cartController.getCheckout()).toEqual(mockCheckoutData);
    });
  });
});
