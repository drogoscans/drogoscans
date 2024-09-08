import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegUser } from "react-icons/fa"
import LogoutButton from "../logoutButton"
export default function DropdownUser() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FaRegUser size={22} className='text-white text-2xl hover:text-red-500 transition duration-300 border-0' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
