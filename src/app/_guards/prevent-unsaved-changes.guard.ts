import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent): boolean {
        if(component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}