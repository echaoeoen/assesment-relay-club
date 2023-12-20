import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Session,
} from '@nestjs/common';
import { AddToCartRequest } from './cart-request';
import CartService from 'src/product/domain/cart.service';
import { CartResponse, CheckoutResponse } from './cart-response';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import SessionData from 'src/common/session';
import { RequestContext } from 'src/common/request-context';

@Controller()
export default class CartController {
  constructor(readonly cartService: CartService) {}
  @Put(`/api/carts`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async addToCart(@Body() body: AddToCartRequest) {
    await this.cartService.addToCart(body.productId, body.quantity);
  }
  @Get(`/api/carts`)
  @ApiExtraModels(CartResponse)
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CartResponse),
      },
    },
  })
  async findAll() {
    const cartItems = await this.cartService.findAll();
    return cartItems.map(CartResponse.fromEntity);
  }
  @Delete(`/api/carts/:productId`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('productId') productId: number,
    @Session() session: SessionData,
  ) {
    await RequestContext.startContext(async () => {
      RequestContext.setContext({ user: session.user });
      return this.cartService.delete(productId);
    });
  }
  @Get(`/api/carts/checkout`)
  @ApiExtraModels(CheckoutResponse)
  @ApiResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CheckoutResponse),
      },
    },
  })
  async getCheckout() {
    const data = await this.cartService.checkout();
    return data.map(CheckoutResponse.fromEntity);
  }
}
