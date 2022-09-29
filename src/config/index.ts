import {environment} from '../environments/environment';

export const ENDPOINTS = {
    user: `${environment.baseUrl}/users`,
    post: `${environment.baseUrl}/posts`,
    comments: `${environment.baseUrl}/comments?postId=`,
}