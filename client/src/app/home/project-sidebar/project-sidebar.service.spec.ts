/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectSidebarService } from './project-sidebar.service';

describe('Service: ProjectSidebar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSidebarService]
    });
  });

  it('should ...', inject([ProjectSidebarService], (service: ProjectSidebarService) => {
    expect(service).toBeTruthy();
  }));
});
