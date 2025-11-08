import { Injectable } from '@angular/core';
import { Alchemy, Block, Network } from 'alchemy-sdk';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Ethereum {
  private alchemy: Alchemy;

  private setting = {
    apiKey: environment.alchemy.apiKey,
    network: Network.ETH_MAINNET,
  };

  constructor() {
    this.alchemy = new Alchemy(this.setting);
  }

  async getLatestBlocks(limit: number = 10): Promise<Block[]> {
    try {
      // 1️⃣ Obtener el número del bloque más reciente
      const latestBlockNumber = await this.alchemy.core.getBlockNumber();

      // 2️⃣ Crear arreglo de promesas para traer los últimos N bloques
      const blockPromises = [];
      for (let i = 0; i < limit; i++) {
        blockPromises.push(this.alchemy.core.getBlock(latestBlockNumber - i));
      }

      // 3️⃣ Esperar a todas las promesas en paralelo
      return await Promise.all(blockPromises);
    } catch (error) {
      console.error('Error al obtener los últimos bloques:', error);
      throw error;
    }
  }
}
