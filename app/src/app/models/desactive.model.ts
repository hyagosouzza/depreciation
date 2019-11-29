import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Desactive {

  desactivated?: boolean;
  reason?: string;
  date?: Timestamp;
}
