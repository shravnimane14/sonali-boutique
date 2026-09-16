'use client';
import {useMemo,useState} from 'react';
import CollectionCard,{Item} from '@/components/CollectionCard';
export default function CollectionBrowser({items}:{items:Item[]}){const [category,setCategory]=useState('All');const cats=['All',...new Set(items.map(x=>x.category))];const visible=useMemo(()=>category==='All'?items:items.filter(x=>x.category===category),[items,category]);return <><div className="collection-toolbar">{cats.map(c=><button key={c} className={`filter ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>)}</div>{visible.length?<div className="saree-grid">{visible.map(i=><CollectionCard key={i.id} item={i}/>)}</div>:<div className="empty">No published pieces in this category yet.</div>}</>}
