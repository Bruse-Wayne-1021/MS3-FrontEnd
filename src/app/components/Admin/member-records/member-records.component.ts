import { Component, OnInit } from '@angular/core';
import { MembersideService } from '../../../Service/memberside.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-records',
  templateUrl: './member-records.component.html',
  styleUrls: ['./member-records.component.css']
})
export class MemberRecordsComponent implements OnInit {
  memberSearchText: string = ''; 
  allMembers: any[] = [];

  constructor(private MemberService: MembersideService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.MemberService.getAllMemberDetails().subscribe({
      next: (data) => {
        console.log(data);
        this.allMembers = data?.$values;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  DeteteMemer(id: string): void {
    this.MemberService.DeteteMemberByID(id).subscribe({
      next: (data) => {
        this.toastr.success("Member Deleted");
      },
      error: (err) => {
        this.toastr.error('Member Not Deleted', err);
      }
    });
  }
}
