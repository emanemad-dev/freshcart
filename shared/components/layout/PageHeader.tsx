import Link from 'next/link';
import { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
  icon?: ReactNode;
  backgroundColor?: string;
}

export function PageHeader({ 
  breadcrumbs = [], 
  title, 
  description, 
  icon,
  backgroundColor = 'bg-green-600' 
}: PageHeaderProps) {
  // Auto-add Home breadcrumb if not present
  const hasHome = breadcrumbs.some(b => b.label.toLowerCase() === 'home');
  const finalBreadcrumbs = hasHome 
    ? breadcrumbs 
    : [{ label: 'Home', href: '/' }, ...breadcrumbs];

  return (
    <div className={`${backgroundColor} py-12`}>
      <div className="container mx-auto px-4">
        {finalBreadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-4">
            {finalBreadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            {icon && <span className="text-white text-3xl">{icon}</span>}
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
          {description && (
            <p className="text-white/80 text-lg mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

