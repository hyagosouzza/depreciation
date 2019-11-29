import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';
import { Desactive } from './desactive.model';

export interface Asset {

	id?: string;
	name?: string;
	code?: string;
	value?: number;
	date?: Timestamp;
	category?: string;
	organization?: string;
	desactive?: Desactive;
}
