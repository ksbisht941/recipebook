import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown/dropdown.directive";
import { LoaderComponent } from "./loader/loader.component";
import { LoggingService } from "./logging/logging.service";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        DropdownDirective,
        AlertComponent,
        PlaceholderDirective,
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    // entryComponents: [AlertComponent],
    exports: [
        DropdownDirective,
        AlertComponent,
        PlaceholderDirective,
        LoaderComponent,
        CommonModule
    ],
    providers: [LoggingService]
})

export class SharedModule {}