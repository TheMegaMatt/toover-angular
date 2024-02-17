import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { defer, from, map, of, switchMap } from 'rxjs';
import { IdTokenResult, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { authState, idToken } from 'rxfire/auth';
import {AUTH} from "@/app.config";
import {AuthState, LoginCredentials} from "@/features/auth/models";

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH);

  // sources
  private user$ = authState(this.auth);
  private idToken$ = idToken(this.auth);

  // state
  private state = signal<AuthState>({
    user: undefined,
    claims: {
      roles: [],
    },
    token: localStorage.getItem('token') || '',
  });

  // selectors
  user = computed(() => this.state().user);
  profileImage = computed(() => this.user()?.photoURL || DEFAULT_IMAGE);
  roles = computed(() => this.state().claims.roles);
  token = computed(() => this.state().token);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(async (user) => {
      return this.state.update((state) => ({
        ...state,
        user,
      }));
    });

    this.user$
        .pipe(
            takeUntilDestroyed(),
            switchMap((user) =>
                user ? from(user.getIdTokenResult(true)) : of({} as IdTokenResult),
            ),
            map((result) => (Object.entries(result).length == 0 ? {} : result.claims)),
        )
        .subscribe(async (claims) => {
          return this.state.update((state) => ({
            ...state,
            claims,
          }));
        });

    this.idToken$.pipe(takeUntilDestroyed()).subscribe(async (token) => {
      localStorage.setItem('token', token?.toString() || '');
      return this.state.update((state) => ({
        ...state,
        token,
      }));
    });
  }

  login(credentials: LoginCredentials) {
    return from(
        defer(() =>
            signInWithEmailAndPassword(this.auth, credentials.email, credentials.password),
        ),
    );
  }

  async logout() {
    await signOut(this.auth);
    localStorage.removeItem('token');
  }

  claims() {
    return from(defer(() => this.user()?.getIdTokenResult()!));
  }
}
