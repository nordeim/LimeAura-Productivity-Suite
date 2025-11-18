/**
 * @file packages/ui/src/components/ProjectSidebar/ProjectSidebar.test.tsx
 * @purpose Tests for the ProjectSidebar component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectSidebar } from './ProjectSidebar';
import { Icon } from '../Icon/Icon';

const navItems = [
  { id: 'board', label: 'Board', icon: <Icon name="LayoutGrid" />, href: '#' },
  { id: 'gantt', label: 'Timeline', icon: <Icon name="BarChart3" />, href: '#' },
];

describe('ProjectSidebar', () => {
  it('renders nav items', () => {
    render(<ProjectSidebar navItems={navItems} activeId="board" />);
    expect(screen.getByText('Board')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('highlights the active item', () => {
    render(<ProjectSidebar navItems={navItems} activeId="board" />);
    const activeItem = screen.getByText('Board');
    expect(activeItem.className).toContain('active');
  });
});
