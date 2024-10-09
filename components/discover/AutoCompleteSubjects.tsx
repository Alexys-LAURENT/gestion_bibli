import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { getSubjectsPaginate } from '@/utils/discover/getSubjectsPaginate';

interface subject {
    id_subject: number;
    label: string;
}

export default function AutoCompleteSubjects({ subjectsFilter, setSubjectsFilter }: { subjectsFilter: subject[]; setSubjectsFilter: any }) {
	const [inputValue, setInputValue] = useState<string>('');
	const [options, setOptions] = useState<subject[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await getSubjectsPaginate(inputValue);

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

	const handleSelect = (option: subject) => {
		if (!subjectsFilter.some((o) => o.label === option.label)) {
			setSubjectsFilter([...subjectsFilter, option]);
		}
		setInputValue('');
		// focus on input after selection
		const input = document.getElementById('searchUser') as HTMLInputElement;
		input.focus();
	};

	const handleRemove = (option: subject) => {
		setSubjectsFilter(subjectsFilter.filter((o) => o.label !== option.label));
	};

	const filteredOptions = options
    .filter(
		(option) =>
			(option.label.toLowerCase().includes(inputValue.toLowerCase()) || option.label.toLowerCase().includes(inputValue.toLowerCase())) &&
			!subjectsFilter.some((o) => o.label === option.label)
	);

	return (
		<div>
			<Input
				id="searchUser"
				autoComplete="off"
				label="Subjects"
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
						{(subject) => (
							<ListboxItem key={subject.id_subject} textValue={subject.label} onClick={() => handleSelect(subject)}>
								<div className="flex gap-2 items-center">
									<div className="flex flex-col">
										<span className="text-sm">{subject.label}</span>
									</div>
								</div>
							</ListboxItem>
						)}
					</Listbox>
				</ScrollShadow>
			)}

			<div className="pt-2 flex gap-2 w-full flex-wrap max-h-[200px] overflow-y-auto">
				{subjectsFilter.map((subject) => (
					<Chip
						key={subject.id_subject}
						onClose={() => handleRemove(subject)} // Remove item from list
						color="primary"
						variant="flat"
						size="sm"
					>
						{subject.label}
					</Chip>
				))}
			</div>
		</div>
	);
}
