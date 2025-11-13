import { Component, Input, OnInit } from '@angular/core';
import { BlockWithTransactions, TransactionReceipt, TransactionResponse } from 'alchemy-sdk';
import { Ethereum } from '../../services/ethereum';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MinerNamePipe } from '../../pipes/miner-name-pipe';
import { formatEther } from 'ethers';

@Component({
  selector: 'app-block',
  imports: [TimeAgoPipe, DatePipe, MinerNamePipe, DecimalPipe],
  templateUrl: './block.html',
  styleUrl: './block.scss',
})
export class Block implements OnInit {
  @Input() blockId!: number;

  block!: BlockWithTransactions;

  burntFeesEth?: string;
  totalRewardEth?: string;

  constructor(private eth: Ethereum) {}

  async ngOnInit() {
    if (this.blockId) {
      this.block = await this.eth.getBlockWithTransactions(Number(this.blockId));

      // Burnt Fees (baseFeePerGas * gasUsed)
      if (this.block.baseFeePerGas && this.block.gasUsed) {
        const burnt = this.block.baseFeePerGas.mul(this.block.gasUsed); // BigInt * BigInt
        this.burntFeesEth = formatEther(burnt.toString());
      }

      // toral tips (priority fees)
      const baseFee = BigInt(this.block.baseFeePerGas?.toString() || '0');
      const receiptPromises = this.block.transactions.map((tx) =>
        this.eth.getTransactionReceipt(tx.hash).then((receipt) => {
          if (!receipt) return 0n;

          const gasUsed = BigInt(receipt.gasUsed.toString());
          const gasPrice = BigInt(tx.gasPrice?.toString() || '0');

          return gasPrice > baseFee ? (gasPrice - baseFee) * gasUsed : 0n;
        })
      );

      // Waiting resolve all promises
      const tipsArray = await Promise.all(receiptPromises);

      // Sum every tips
      const totalTips = tipsArray.reduce((acc, tip) => acc + tip, 0n);

      // Save result
      this.totalRewardEth = formatEther(totalTips.toString());

      //   // total tips (priority fees)
      //   let totalTips = 0n;

      //   for (const tx of this.block.transactions) {
      //     // Obtener el receipt de la transacción
      //     const receipt = await this.eth.getTransactionReceipt(tx.hash);
      //     if (!receipt) continue;

      //     // gasUsed (BigInt)
      //     const gasUsed = BigInt(receipt.gasUsed.toString());
      //     const gasPrice = BigInt(tx.gasPrice?.toString() || '0');
      //     const baseFee = BigInt(this.block.baseFeePerGas?.toString() || '0');

      //     // Calcular tip = (gasPrice - baseFee) * gasUsed
      //     const tip = gasPrice > baseFee ? (gasPrice - baseFee) * gasUsed : 0n;
      //     totalTips += tip;
      //   }

      //   // 4️⃣ Block Reward final (sólo tips, ya no hay reward base)
      //   this.totalRewardEth = formatEther(totalTips.toString());
      // }
    }
  }
}

// console.log(this.block.transactions.forEach((tx: TransactionResponse) => console.log(tx.wait)))
