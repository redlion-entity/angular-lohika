import { iif, Observable, of, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  map,
  switchMap
} from 'rxjs/operators';

import { Branch, Branches, Repo, Repos, SearchResult } from './types'

const input: HTMLElement = document.getElementById('repo-search');
const observable$: Observable<SearchResult> = fromEvent(input, 'input').pipe(
  debounceTime(1000),
  map((event: Event): string => (event.target as HTMLInputElement).value),
  switchMap(
    (query: string): Observable<Repos> => iif(
      (): boolean => query && query.length > 2,
      ajax.getJSON(`https://api.github.com/search/repositories?q=${query}+in:name`),
      of({ items: [] })
    )
  ),
  map(({ items }: Repos): SearchResult => ({ repos: items })),
  switchMap(
    ({ repos }: SearchResult): Observable<(Branches | null)> => iif(
      (): boolean => repos.length === 1,
      ((): Observable<Branches> => {
        if (repos.length > 0) {
          const { name, owner: { login } }: Repo = repos[0];

          return ajax.getJSON(`https://api.github.com/repos/${login}/${name}/branches`)
        }
      })(),
      of(null)
    ),
    ({ repos }: SearchResult, branches: (Branches | null)): SearchResult => {
      const result: SearchResult = { repos };

      if (branches) {
        result.branches = branches;
      }

      return result;
    }
  )
);

let reposContainer: HTMLElement, branchesContainer: HTMLElement, errorContainer: HTMLElement;
const bodyElement: HTMLElement = document.body;

observable$.subscribe(
  ({ repos, branches }: SearchResult) => {
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
    }
  },
  (error: Error): void => {
    if (reposContainer) {
      branchesContainer = null;
      bodyElement.removeChild(reposContainer);
      reposContainer = null;
    }
    if (errorContainer) {
      bodyElement.removeChild(errorContainer);
      errorContainer = null;
    }

    errorContainer = document.createElement('div');
      errorContainer.innerHTML = `<h5>Error occurred:</h5><p>${error.name}[${error.message}]</p>`;
      bodyElement.appendChild(errorContainer);
  }
);