import { environment } from 'src/environments/environment';
const url = environment.link;

export const ENDPOINT = {
    LOGIN: `${url}auth/signin`,//OK
    MATARIALS: `${url}material`,//OK
    STUDENTS: `${url}students`,//OK
    SCHEDULES: `${url}schedules`,//OK
}