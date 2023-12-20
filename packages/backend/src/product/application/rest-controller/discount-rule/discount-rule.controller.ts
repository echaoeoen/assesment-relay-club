import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import DiscountRuleService from '../../../domain/discount-rule.service';
import { DicountRuleRequest } from './discount-rule-request';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import {
  DiscountRulePaginatedResponse,
  DiscountRuleResponse,
} from './discount-rule-response';
import { PaginationParam } from 'src/common/pagination';

@Controller()
export default class DiscountRuleController {
  constructor(readonly discountRuleService: DiscountRuleService) {}

  @Post(`/api/product/:productId/discount-rules`)
  @HttpCode(HttpStatus.CREATED)
  @ApiExtraModels(DiscountRuleResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(DiscountRuleResponse),
    },
  })
  async create(
    @Param('productId') productId: number,
    @Body() body: DicountRuleRequest,
  ) {
    const created = await this.discountRuleService.create(
      productId,
      body.toEntity(),
    );
    return DiscountRuleResponse.fromEntity(created);
  }

  @Put(`/api/product/:productId/discount-rules/:id`)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiExtraModels(DiscountRuleResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(DiscountRuleResponse),
    },
  })
  async edit(
    @Param('productId') productId: number,
    @Param('id') id: number,
    @Body() body: DicountRuleRequest,
  ) {
    const updated = await this.discountRuleService.edit(
      productId,
      id,
      body.toEntity(),
    );
    return DiscountRuleResponse.fromEntity(updated);
  }
  @Delete(`/api/discount-rules/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('productId') productId: number, @Param('id') id: number) {
    await this.discountRuleService.delete(id);
  }
  @Get(`/api/discount-rules/:id`)
  @ApiExtraModels(DiscountRuleResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(DiscountRuleResponse),
    },
  })
  async findOne(@Param('id') id: number) {
    const data = await this.discountRuleService.findById(id);
    return DiscountRuleResponse.fromEntity(data);
  }
  @Get(`/api/discount-rules`)
  @ApiExtraModels(DiscountRuleResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(DiscountRuleResponse),
    },
  })
  async findAll(@Query() param: PaginationParam) {
    const data = await this.discountRuleService.findAll(param);
    return DiscountRulePaginatedResponse.fromEntity(data);
  }
}
