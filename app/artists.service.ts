import {Artist} from './artist';
import {ARTISTS} from './artist-information';
import {Injectable} from 'angular2/core'

@Injectable()
export class ArtistService {
  getArtists() {
    return Promise.resolve(ARTISTS);
  }
}
