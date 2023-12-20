import { Test, TestingModule } from '@nestjs/testing';
import ProductController from './product.controller';
import ProductService from '../../../domain/product.service';
import { CreateProductRequest, UpdateProductRequest } from './product-request';
import { PaginationParam } from 'src/common/pagination';
import Product from 'src/product/entity/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            edit: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const req: CreateProductRequest = Object.assign(
        new CreateProductRequest(),
        { name: 'some name', price: 100, sku: 'some sku' },
      );
      jest.spyOn(service, 'create').mockResolvedValue({
        discountRules: [],
        id: 1,
        name: 'some name',
        sku: 'some sku',
        price: 100,
      } as Product);

      await controller.create(req);

      expect(service.create).toHaveBeenCalledWith(req.toEntity());
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const param: PaginationParam = { page: 1, size: 10 };
      jest.spyOn(service, 'findAll').mockResolvedValue({
        items: [
          {
            discountRules: [],
            id: 1,
            name: 'some name',
            sku: 'some sku',
            price: 100,
          } as Product,
        ],
        currentPage: 1,
        totalItems: 0,
        totalPages: 1,
      });

      await controller.findAll(param);

      expect(service.findAll).toHaveBeenCalledWith(param);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const id = 1;
      jest.spyOn(service, 'findById').mockResolvedValue({
        discountRules: [],
        id: 1,
        name: 'some name',
        sku: 'some sku',
        price: 100,
      } as Product);

      await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('edit', () => {
    it('should update a product', async () => {
      const id = 1;
      const req: UpdateProductRequest = Object.assign(
        new UpdateProductRequest(),
        {
          name: 'some name',
          price: 100,
        } as UpdateProductRequest,
      );
      jest.spyOn(service, 'edit').mockResolvedValue({
        discountRules: [],
        id: 1,
        name: 'some name',
        sku: 'some sku',
        price: 100,
      } as Product);

      await controller.edit(id, req);

      expect(service.edit).toHaveBeenCalledWith(id, req.toEntity());
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const id = 1;
      jest.spyOn(service, 'delete').mockResolvedValue();

      await controller.delete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
