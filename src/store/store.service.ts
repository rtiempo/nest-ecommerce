import { Injectable } from '@nestjs/common';
import { products, stores } from 'src/db';
import { v4 as uuid } from 'uuid';
import { ProductDto } from 'src/product/dto/product.dto';
import { CreateStoreDto, StoreDto, UpdateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  private stores = stores;
  private products = products;

  getStores(): StoreDto[] {
    return this.stores;
  }

  getStoreById(storeId: string): StoreDto {
    return this.stores.find((store) => {
      return store.id === storeId;
    });
  }

  getStoreProducts(storeId: string): ProductDto[] {
    return this.products.filter((product) => {
      return product.store === storeId;
    });
  }

  createStore(payload: CreateStoreDto): StoreDto {
    const newStore = {
      id: uuid(),
      ...payload,
    };

    this.stores.push(newStore);

    return newStore;
  }

  updateStore(payload: UpdateStoreDto, storeId: string): StoreDto {
    let updatedStore: StoreDto;

    const updatedStoreList = this.stores.map((store) => {
      if (store.id === storeId) {
        updatedStore = {
          id: storeId,
          ...payload,
        };
      } else return store;
    });

    this.stores = updatedStoreList;

    return updatedStore;
  }
}
