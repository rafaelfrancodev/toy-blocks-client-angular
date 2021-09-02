import { Component, OnInit, Input } from '@angular/core';
import { BlocksStore } from '../services/blocks-store.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() nodeUrl: string;

  constructor(public storeBlocks: BlocksStore) { }

  ngOnInit() {
    this.storeBlocks.resetBlocks();
    this.storeBlocks.getBlocks(this.nodeUrl);
  }

}
