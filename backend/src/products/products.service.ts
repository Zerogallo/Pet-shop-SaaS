import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
     private productRepository: Repository<Product>) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({where: {id}});
    if (!product) {
      throw new NotAcceptableException('Product com ID ${id} não encontrado');
    }
    return product;
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
      await this.findOne(id); // Verifica se o produto existe após a atualização
      await this.productRepository.update(id, productData);
    return this.findOne(id);
  }

    async delete(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotAcceptableException(`Produto com ID ${id} não encontrado`);
        }
    }
    async updatestock(id: number, quantity: number): Promise<Product> {
        const product = await this.findOne(id);
        product.stock += quantity;
        if (product.stock < 0) product.stock = 0; // Evita estoque negativo
        return this.productRepository.save(product);
        
    }


}