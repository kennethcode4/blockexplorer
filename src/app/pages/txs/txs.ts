import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Ethereum } from '../../services/ethereum';
import { Block, BlockWithTransactions } from 'alchemy-sdk';

@Component({
  selector: 'app-txs',
  imports: [],
  templateUrl: './txs.html',
  styleUrl: './txs.scss',
})
export class Txs implements AfterViewInit {
  @Input() blockId!: number;

  block: BlockWithTransactions | null = null;
  loading = true;
  error: string | null = null;

  constructor(private eth: Ethereum) {}
  
  async ngAfterViewInit() {
    try {
      this.block = await this.eth.getBlockWithTransactions(Number(this.blockId));
      this.loading = false;
    } catch (err: any) {
      this.error = err.message || 'Unknown error!';
      this.loading = false;
    }
  } 

}
