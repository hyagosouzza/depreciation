import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactiveAssetDialogComponent } from './desactive-asset-dialog.component';

describe ('DesactiveAssetDialogComponent', () => {
  let component: DesactiveAssetDialogComponent;
  let fixture: ComponentFixture<DesactiveAssetDialogComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      declarations: [DesactiveAssetDialogComponent]
    })
            .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (DesactiveAssetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should create', () => {
    expect (component).toBeTruthy ();
  });
});
