import { Controller,Get,Post,Put,Delete,Patch,Body,Param,ParseIntPipe,UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Post()
    create(@Body() productData: any) {
        return this.productsService.create(productData);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() productData: any) {
        return this.productsService.update(id, productData);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }

    @Patch(':id/stock')
    updateStock(
        @Param('id', ParseIntPipe) id: number, 
        @Body('quantity') quantity: number) {
        return this.productsService.updatestock(id, quantity);
    }
}