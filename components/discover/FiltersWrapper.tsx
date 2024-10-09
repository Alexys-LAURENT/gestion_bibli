import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import AutoCompleteAuthors from "./AutoCompleteAuthors";
import AutoCompleteSubjects from "./AutoCompleteSubjects";

interface author {
    id_author: number;
    name_author: string;
}

interface subject {
    id_subject: number;
    label: string;
}

const FiltersWrapper = ({ fetchSearchData, bookNameFilter, setBookNameFilter, authorsFilter, setAuthorsFilter, subjectsFilter, setSubjectsFilter, publishYearFilter, setPublishYearFilter } : { fetchSearchData: any, bookNameFilter: string, setBookNameFilter: any, authorsFilter: author[], setAuthorsFilter: any, subjectsFilter: subject[], setSubjectsFilter: any, publishYearFilter: any, setPublishYearFilter: any }) => {

    const getSearchUrl = () => {
        let url = "/discover?";
        if (bookNameFilter) {
            url += `bookName=${bookNameFilter}&`;
        }
        if (authorsFilter.length > 0) {
            url += `authors=${authorsFilter.map((author) => author.name_author).join("|")}&`;
        }
        if (subjectsFilter.length > 0) {
            url += `subjects=${subjectsFilter.map((subject) => subject.label).join("|")}&`;
        }
        if (publishYearFilter) {
            url += `publishYear=${publishYearFilter}&`;
        }
        return url;
    }

    const clearFilters = () => {
        setBookNameFilter("");
        setAuthorsFilter([]);
        setSubjectsFilter([]);
        setPublishYearFilter("");
    }

    const handleChangePublishYear = (e:any) => {
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
        e.key === "Enter" && document.getElementById("FilterButton")?.click()
    }

    return (
        <div className="flex flex-col justify-between p-4 w-full h-full overflow-y-auto">
            <div className="w-full h-full flex flex-col gap-4">
                <Input label="Book Name" labelPlacement="outside" placeholder=" " value={bookNameFilter} onValueChange={setBookNameFilter} onKeyDown={(e) => e.key === "Enter" && document.getElementById("FilterButton")?.click()} />
                <AutoCompleteAuthors authorsFilter={authorsFilter} setAuthorsFilter={setAuthorsFilter} />
                <AutoCompleteSubjects subjectsFilter={subjectsFilter} setSubjectsFilter={setSubjectsFilter} />
                <Input type="number" label="Publish Year" labelPlacement="outside" placeholder=" " value={publishYearFilter} onValueChange={setPublishYearFilter} onKeyDown={(e) => handleChangePublishYear(e)} />
            </div>
            <div className="flex gap-2 w-full">
                {(bookNameFilter || authorsFilter.length > 0 || subjectsFilter.length > 0 || publishYearFilter) &&
                    <Button as={Link} href="/discover" isIconOnly variant="flat" className="bg-red-400 text-white" onClick={() => clearFilters()}>
                        <TrashIcon className="w-6 h-6" />
                    </Button>
                }
                <Button id="FilterButton" as={Link} href={getSearchUrl()} variant="flat" className="w-full bg-gest_cta text-white" onClick={() => fetchSearchData()}>Filter</Button>
            </div>
        </div>
    );
};

export default FiltersWrapper;