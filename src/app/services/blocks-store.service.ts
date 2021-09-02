import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResult } from 'src/models/base/base-result.model';
import Block from 'src/models/block.model';
import { ApiService } from './api.service';
import { State } from './state';
import { Store } from './store';
import Blocks from 'src/models/blocks.model';

@Injectable({
  providedIn: 'root'
})
export class BlocksStore extends Store<Blocks> {
  constructor(private api: ApiService) {
    super(new State().blocks);
  }

  public resetBlocks() {
    this.setState(null);
  }

  public getBlocks(nodeUrl: string) {
    this.setState({
      blocks: [],
      loading: true
    });
    this._getBlocks(nodeUrl).subscribe((value: Blocks) => {
      this.setState({
        blocks: [...value.blocks],
        loading: false
      });
    });
  }

  public _getBlocks(nodeUrl: string) {
    return this.api.get(`${nodeUrl}/api/v1/blocks`).pipe(
      catchError(error =>
        of({
          blocks: [],
          loading: false
        })
      ),
      map<BaseResult<Block[]>, Blocks>((blocks: BaseResult<Block[]>) => {
        return {
          blocks: (blocks.data) ? [...blocks.data] : [],
          loading: false
        }
      })
    );
  }
}
