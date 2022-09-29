import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin, map, Observable, tap, toArray, debounceTime } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
// import { SearchcontentPipe } from 'src/app/pipes/searchcontent.pipe';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listTypeToView!: FormGroup;
  searchContent!: FormGroup;
  listRetrived: any = [];
  allDataList = [];
  filteredPosts: any = [];
  filteredComments: any = [];
  constructor(private user: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log('form-pre data: ', this.user.filterOfTable);
    console.log('form-pre data: ', this.filteredComments, this.user.filterOfTable,this.listRetrived);
    const preFormdata = this.user.getPredata() ?? '';
    const filterData = this.user.filterOfTable ?? '';

    // formGroups ======================
    this.listTypeToView = this.fb.group({
      listType: [filterData.filter]
    })
    this.searchContent = this.fb.group({
      keyword: [preFormdata.keyword]
    })


    this.listTypeToView.controls['listType'].valueChanges.subscribe(
      {
        next: (value) => {
          this.showList(value);
          this.user.filterOfTable = { filter: value };
          console.log(value);
          if (this.searchContent.value.keyword) {
            this.searchFilter(this.searchContent.value.keyword, value);
          }
        }
      }
    )

    this.searchContent.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe({
        next: (value) => {
          console.log('search keyword', value);
          this.searchFilter(value, this.listTypeToView.value.listType);
          this.user.setPredata(this.searchContent.value);
        }
      })

    forkJoin([
      this.user.getPosts().pipe(
        map((x: any) => {
          x.category = 'posts';
          return x;
        })
      ),
      this.user.getComments(1).pipe(
        map((x: any) => {
          x.category = 'comments';
          return x;
        })
      )
    ]).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.allDataList = res;
        if (filterData.filter) {
          this.showList(filterData.filter);
          if(preFormdata.keyword && preFormdata.keyword !== ''){
            this.searchFilter(preFormdata.keyword, filterData.filter);
          }
        }
      }
    })


    // this.user.getPosts()
    //   .pipe(
    //     map((x: any, index) => {
    //       x[index].category = 'post';
    //       return x;
    //     })
    //   )
    //   .subscribe(
    //     {
    //       next: (res: any) => {
    //         console.log('posts', res);
    //         // this.postsRetrived = res.map((x:any)=>{
    //         //   x.category = 'post'
    //         //   return x;
    //         // })
    //         // console.log(this.postsRetrived)
    //       }
    //     }
    //   )

  }


  showList(listType: string) {
    this.filteredPosts = []
    this.filteredComments = [];
    this.listRetrived = this.allDataList.filter((data: any) => data.category == listType).map((item: any) => {
      item.category = listType;
      return item;
    });
    console.log('retrived data: ', this.listRetrived[0])
    if (this.listRetrived[0].category == 'posts') {
      this.filteredPosts = this.listRetrived[0]['posts']
      console.log(this.filteredPosts)
    } else if (this.listRetrived[0].category == 'comments') {
      this.filteredComments = this.listRetrived[0]['comments'];
      console.log(this.filteredComments)
    }
  }

  searchFilter(keyword: string, searchtype: string) {
    let keywordToSearch = keyword.trim();
    if (searchtype === 'posts') {
      this.filteredPosts = this.listRetrived[0].posts.filter((item: any) => {
        if (item.title.toLowerCase().includes(keywordToSearch.toLowerCase()) || item.body.toLowerCase().includes(keywordToSearch.toLowerCase())) {
          return item;
        }
      });
      if (this.filteredPosts.length === 0 && keywordToSearch == '') {
        this.filteredPosts = this.listRetrived[0]['posts'];
      }
    } else if (searchtype === 'comments') {
      this.filteredComments = this.listRetrived[0].comments.filter((item: any) => {
        if (item.body.toLowerCase().includes(keywordToSearch.toLowerCase())) {
          return item;
        }
      });
      if (this.filteredComments.length === 0 && keywordToSearch == '') {
        this.filteredComments = this.listRetrived[0]['comments']
      }
    }
  }

  // ======================= 
// searchContent
  searchTxt: string = '';
  characters:any = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ]







}
