import { TestBed } from '@angular/core/testing';
import { ProfileSettingsResolverService } from '../profile-settings-resolver.service';


describe('ProfileSettingsResolverService', () => {
  let service: ProfileSettingsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSettingsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
