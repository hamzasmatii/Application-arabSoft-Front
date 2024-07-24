// Table data
export interface Table {
    nom?: string;
    chefEquipe?: string;
   
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
