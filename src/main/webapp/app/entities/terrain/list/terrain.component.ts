import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerrain } from '../terrain.model';
import { TerrainService } from '../service/terrain.service';
import { TerrainDeleteDialogComponent } from '../delete/terrain-delete-dialog.component';

@Component({
  selector: 'jhi-terrain',
  templateUrl: './terrain.component.html',
})
export class TerrainComponent implements OnInit {
  terrains?: ITerrain[];
  isLoading = false;

  constructor(protected terrainService: TerrainService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.terrainService.query().subscribe(
      (res: HttpResponse<ITerrain[]>) => {
        this.isLoading = false;
        this.terrains = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITerrain): number {
    return item.id!;
  }

  delete(terrain: ITerrain): void {
    const modalRef = this.modalService.open(TerrainDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.terrain = terrain;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
