import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import Image from 'next/image';
import { getAuthorsPaginate } from '@/utils/discover/getAuthorsPaginate';

interface author {
	id_author: number;
	name_author: string;
}

export default function AutoCompleteAuthors({ authorsFilter, setAuthorsFilter }: { authorsFilter: author[]; setAuthorsFilter: any }) {
	const [inputValue, setInputValue] = useState<string>('');
	const [options, setOptions] = useState<author[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log(options);
    } , [options])

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await getAuthorsPaginate(inputValue, authorsFilter);

				setOptions(res.data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (inputValue) {
			fetchOptions();
		} else {
			setOptions([]);
		}
	}, [inputValue]);

	const handleSelect = (option: author) => {
		if (!authorsFilter.some((o) => o.name_author === option.name_author)) {
			setAuthorsFilter([...authorsFilter, option]);
		}
		setInputValue('');
		// focus on input after selection
		const input = document.getElementById('searchAuthors') as HTMLInputElement;
		input.focus();
	};

	const handleRemove = (option: author) => {
		setAuthorsFilter(authorsFilter.filter((o) => o.name_author !== option.name_author));
	};

	const filteredOptions = options
    .filter(
		(option) =>
			(option.name_author.toLowerCase().includes(inputValue.toLowerCase()) || option.name_author.toLowerCase().includes(inputValue.toLowerCase())) &&
			!authorsFilter.some((o) => o.name_author === option.name_author)
	);

	return (
		<div>
			<Input
				id="searchAuthors"
				autoComplete="off"
				label="Authors"
                labelPlacement='outside'
				placeholder=" "
				value={inputValue}
				onValueChange={setInputValue}
				endContent={
					loading ? (
						<Spinner size="sm" />
					) : inputValue && filteredOptions.length === 0 ? (
						<XMarkIcon className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 rounded-full" onClick={() => setInputValue('')} />
					) : null
				}
			/>

			{/* Custom Dropdown List for Autocomplete */}
			{inputValue && !loading && !error && (
				<ScrollShadow size={50} hideScrollBar className="max-h-[250px]">
					<Listbox emptyContent={null} items={filteredOptions} label="Assigned to" selectionMode="multiple" variant="flat">
						{(author) => (
							<ListboxItem key={author.id_author} textValue={author.name_author} onClick={() => handleSelect(author)}>
								<div className="flex gap-2 items-center">
									<div className="flex flex-col">
										<span className="text-sm">{author.name_author}</span>
									</div>
								</div>
							</ListboxItem>
						)}
					</Listbox>
				</ScrollShadow>
			)}

			<div className="pt-2 flex gap-2 w-full flex-wrap max-h-[200px] overflow-y-auto">
				{authorsFilter.map((author) => (
					<Chip
						key={author.id_author}
						onClose={() => handleRemove(author)} // Remove item from list
						color="primary"
						variant="flat"
						size="sm"
					>
						{author.name_author}
					</Chip>
				))}
			</div>
		</div>
	);
}
