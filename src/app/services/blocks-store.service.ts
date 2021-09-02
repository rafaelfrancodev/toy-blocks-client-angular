import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResult } from 'src/models/base/base-result.model';
import Block from 'src/models/block.model';
import { ApiService } from './api.service';
import { State } from './state';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class BlocksStore extends Store<Block[]> {
  constructor(private api: ApiService) {
    super(new State().blocks);
  }

  public resetBlocks() {
    this.setState(null);
  }

  public getBlocks(nodeUrl: string) {
    this._getBlocks(nodeUrl).subscribe((value: Block[]) => {
      this.setState([...value]);
    });
  }

  public _getBlocks(nodeUrl: string) {
    return this.api.get(`${nodeUrl}/api/v1/blocks`).pipe(
      catchError(error =>
        of({
          blocks: []
        })
      ),
      map<BaseResult<Block[]>, Block[]>((blocks: BaseResult<Block[]>) => {
        return (blocks.data) ? [...blocks.data] : [];
      })
    );
  }
}
