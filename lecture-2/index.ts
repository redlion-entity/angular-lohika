import { Observable, of, fromEvent } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  debounceTime,
  map,
  switchMap
} from 'rxjs/operators';

import { Branch, Branches, Repo, Repos, SearchResult } from './types'

const input: HTMLElement = document.getElementById('repo-search');
const observable$: Observable<SearchResult> = fromEvent(input, 'keyup').pipe(
    debounceTime(1000),
    map((event: Event): string => event.target.value),
    switchMap((name: string): Observable<SearchResult> => {
      if (name.length >= 3) {
        return fromFetch(`https://api.github.com/search/repositories?q=${name}+in:name`).pipe(
            switchMap((response: Response): (Observable<SearchResult> | Promise<Repos>) => {
              if (response.ok) {
                return response.json();
              } else {
                return of({ error: true, message: `Error ${response.status}` });
              }
            }),
            map((data: (SearchResult | Repos)) => (data.hasOwnProperty('items') ? { repos: data.items } : data)),
            switchMap((data: SearchResult): Observable<SearchResult> => {
              const { repos }: SearchResult = data

              if (Array.isArray(repos) && repos.length == 1) {
                const { name, owner: { login } }: Repo = repos[0];

                return fromFetch(`https://api.github.com/repos/${login}/${name}/branches`).pipe(
                    switchMap((response: Response): (Observable<SearchResult> | Promise<Branches>) => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        return of({ error: true, message: `Error ${response.status}` });
                      }
                    }),
                    map((data: (SearchResult | Branches)) => (Array.isArray(data) ? { repos, branches: data } : data))
                )
              }

              return of(data)
            })
        )
      } else {
        return of({ repos: [] })
      }
    }),
    catchError(error => {
      return of({ error: true, message: error.message })
    })
);

let reposContainer: HTMLElement, branchesContainer: HTMLElement, errorContainer: HTMLElement;
const bodyElement: HTMLElement = document.body;

observable$.subscribe(({ repos, branches, error, message }: SearchResult) => {
  if (reposContainer) {
    branchesContainer = null;
    bodyElement.removeChild(reposContainer);
    reposContainer = null;
  }
  if (errorContainer) {
    bodyElement.removeChild(errorContainer);
    errorContainer = null;
  }

  if (repos && repos.length) {
    if (branches) {
      let branchesContainerContentStr = '<h5>Branches:</h5><ul>';

      branches.forEach(({ name }: Branch) => branchesContainerContentStr += `<li>${name}</li>`)

      branchesContainerContentStr += '</ul>';

      branchesContainer = document.createElement('div');
      branchesContainer.innerHTML = branchesContainerContentStr;
    }

    let reposContainerContentStr = '<h4>Repositories:</h4><ul>';

    repos.every(({ full_name }: Repo, index: number): boolean => {
      reposContainerContentStr += `<li>${index < 5 ? full_name : '...'}</li>`;

      return index < 5;
    })

    reposContainerContentStr += '</ul><br />';

    reposContainer = document.createElement('div');
    reposContainer.innerHTML = reposContainerContentStr;

    if (branchesContainer) {
      reposContainer.appendChild(branchesContainer);
    }

    bodyElement.appendChild(reposContainer);
  } else if (error) {
    errorContainer = document.createElement('div');
    errorContainer.innerHTML = `<h5>Error occurred:</h5><p>${message}</p>`;
    bodyElement.appendChild(errorContainer);
  }
});