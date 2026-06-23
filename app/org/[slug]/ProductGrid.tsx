"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  taxRate: number;
  taxInclusive: boolean;
  unit: string;
  hsnCode?: string;
  images: string[];
  stockQuantity: number;
  brand?: string;
  condition?: string;
  mpn?: string;
  gtin?: string;
}

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ProductGrid({ products, orgName, orgEmail, orgPhone }: {
  products: Product[];
  orgName: string;
  orgEmail: string;
  orgPhone: string;
}) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const open = (p: Product) => { setSelected(p); setImgIdx(0); };
  const close = () => setSelected(null);

  if (products.length === 0) {
    return <p className="text-gray-500 text-center py-12">No products listed yet.</p>;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all overflow-hidden cursor-pointer"
            onClick={() => open(product)}
            itemScope
            itemType="https://schema.org/Product"
          >
            <meta itemProp="name" content={product.name} />
            <meta itemProp="description" content={product.description || product.name} />
            {product.images[0] && <meta itemProp="image" content={product.images[0]} />}
            {product.brand && <meta itemProp="brand" content={product.brand} />}
            {product.gtin && <meta itemProp="gtin" content={product.gtin} />}
            <div className="w-full h-48 bg-gray-50 overflow-hidden">
              <img
                src={product.images[0] || PLACEHOLDER}
                alt={product.name}
                loading="lazy"
                width={400}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 line-clamp-1" itemProp="name">{product.name}</h3>
              {product.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2" itemProp="description">{product.description}</p>
              )}
              <div className="mt-4 flex items-center justify-between" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="INR" />
                <meta itemProp="price" content={String(product.price)} />
                <meta itemProp="availability" content={product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                <span className="text-indigo-600 font-bold text-lg">
                  ₹{product.price.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-gray-400 ml-1">/{product.unit}</span>
                </span>
                {product.hsnCode && (
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">HSN {product.hsnCode}</span>
                )}
              </div>
              {product.taxRate > 0 && (
                <p className="mt-1 text-xs text-gray-400">GST {product.taxRate}%{product.taxInclusive ? " incl." : " excl."}</p>
              )}
              <p className="mt-3 text-xs text-indigo-500 font-medium">View details →</p>
            </div>
          </article>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={close}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image gallery */}
            <div className="relative bg-gray-50">
              <img
                src={selected.images[imgIdx] || PLACEHOLDER}
                alt={selected.name}
                className="w-full h-72 object-contain"
              />
              {selected.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 text-gray-700 font-bold text-lg leading-none"
                    onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + selected.images.length) % selected.images.length); }}
                  >
                    &lsaquo;
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 text-gray-700 font-bold text-lg leading-none"
                    onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % selected.images.length); }}
                  >
                    &rsaquo;
                  </button>
                </>
              )}
              <button
                type="button"
                className="absolute top-3 right-3 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white shadow"
                onClick={close}
              >
                &#x2715;
              </button>
            </div>

            {/* Thumbnails */}
            {selected.images.length > 1 && (
              <div className="flex gap-2 px-5 pt-3 overflow-x-auto">
                {selected.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 transition-colors ${i === imgIdx ? "border-indigo-500" : "border-transparent hover:border-gray-300"}`}
                    onClick={() => setImgIdx(i)}
                  />
                ))}
              </div>
            )}

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${selected.stockQuantity > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {selected.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {selected.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{selected.description}</p>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{selected.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-gray-400">per {selected.unit}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {selected.taxRate > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">GST</p>
                    <p className="font-medium">{selected.taxRate}% {selected.taxInclusive ? "(incl.)" : "(excl.)"}</p>
                  </div>
                )}
                {selected.hsnCode && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">HSN Code</p>
                    <p className="font-medium font-mono">{selected.hsnCode}</p>
                  </div>
                )}
                {selected.brand && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Brand</p>
                    <p className="font-medium">{selected.brand}</p>
                  </div>
                )}
                {selected.condition && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Condition</p>
                    <p className="font-medium capitalize">{selected.condition}</p>
                  </div>
                )}
                {selected.gtin && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">GTIN / Barcode</p>
                    <p className="font-medium font-mono">{selected.gtin}</p>
                  </div>
                )}
                {selected.mpn && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">MPN</p>
                    <p className="font-medium font-mono">{selected.mpn}</p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Unit</p>
                  <p className="font-medium uppercase">{selected.unit}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Contact to order</p>
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${orgEmail}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
                    ✉️ {orgEmail}
                  </a>
                  <a href={`tel:${orgPhone}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
                    📞 {orgPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
