import React from 'react'
import Header from '../../components/tools/Header'
import ManageYears from '../../components/management/ManageYears'
import { useSelector } from 'react-redux'

export default function ManageYearsPage() {
    const {lang} = useSelector(s => s.global)

    return (
        <div>
            <Header title={lang.links.grades} />
            <ManageYears />
        </div>
    )
}
