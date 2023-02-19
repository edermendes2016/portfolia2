import { Component, OnInit } from '@angular/core';
import { Octokit } from '@octokit/rest';

@Component({
  selector: 'app-github-projects',
  templateUrl: './github-projects.component.html',
})



export class GithubProjectsComponent implements OnInit {
  anoPesquisado: number | undefined;
  projetos: any[] = [];
  isLoading: boolean | undefined;
  filteredProjects: any[] | undefined;
  octokit = new Octokit();

  ngOnInit() {
    this.buscarAllProjetos();    
    this.buscarAllProjetos();
  }

  buscarAllProjetos() {
    this.anoPesquisado = undefined;
    this.octokit.repos
      .listForUser({ username: 'edermendes2016' })
      .then((response) => {
        this.projetos = response.data;
      });
  }
  buscarProjetosPorAno() {
    this.isLoading = true;
    const options = {
      username: 'edermendes2016',
      per_page: 100,
    };
    this.octokit.repos.listForUser(options)
      .then(response => {
        const projetos = response.data;
        const filteredProjects = projetos.filter(projeto => {
          const dataCriacao = projeto.created_at ? new Date(projeto.created_at) : new Date();          
          return dataCriacao.getFullYear() === Number(this.anoPesquisado);          
        });
        this.projetos = filteredProjects;
        this.isLoading = false;
      })
      .catch((error: any) => {
        console.error(error);
        this.isLoading = false;
      });

  }

}
