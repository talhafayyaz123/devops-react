'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, lazy, useEffect, Suspense } from 'react';

import { SearchIcon } from '@/assets';
import viewIcon from '@/assets/view-icon.svg';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
import useDebounce from '@/hooks/useDebounce';
import { FetchUsers } from '@/services/apiService';
import { useMember } from '@/store/MemberContext';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

export default function UserManagementActive() {
  const { setCurrentMember } = useMember();
  const router = useRouter();
  const columns = [
    // 'Select',
    'User ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Nationality',
    'Action',
    // 'Reset Link',
  ];

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isNoData, setIsNoData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await FetchUsers(
          currentPage,
          perPage,
          debouncedSearchTerm,
        );
        setData(fetchedData?.data);
        setTotalCount(fetchedData?.total);
        if (fetchedData?.data?.length === 0) {
          setIsNoData(true);
        } else {
          setIsNoData(false);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setIsNoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [currentPage, perPage, debouncedSearchTerm]);

  const renderCell = (item: any, column: string, rowIndex: any) => {
    switch (column) {
      case 'Select':
        return (
          <div className="flex justify-center">
            <Input type="radio" minWidth="maxContent" />
          </div>
        );

      case 'Action':
        return (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              setCurrentMember(data[rowIndex]);
              router.push('/user-management/add-user-personal-details');
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
              }
            }}
          >
            <Image alt="View Icon" src={viewIcon} />
            <span>{item[column]}</span>
          </div>
        );

      // case 'Reset Link':
      //   return (
      //     <div className="flex items-center gap-2 cursor-pointer">
      //       <span className="text-blue-200 underline">{item[column]}</span>
      //     </div>
      //   );

      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2 text-[#051225]">
        User Management
      </Title>
      <Wrapper>
        <div className="flex"></div>
        <div className=" flex items-end">
          <Input
            type="text"
            placeholder="Search"
            inputSize="sm"
            minWidth="400px"
            className="bg-white !border-0"
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<SearchIcon />}
          />
        </div>
      </Wrapper>
      <div className="bg-white auto">
        {isLoading ? (
          <Loader />
        ) : isNoData ? (
          <div className="p-4 text-center text-gray-500">No data available</div>
        ) : (
          <Suspense fallback={<Loader />}>
            <DataTable
              columns={columns}
              data={data}
              renderCell={renderCell}
              pagination={{
                total: totalCount,
                perPage,
                currentPage,
                onPageChange: setCurrentPage,
                onPerPageChange: setPerPage,
              }}
            />
          </Suspense>
        )}
      </div>{' '}
    </main>
  );
}
