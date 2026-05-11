'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  styled,
  alpha,
  Button,
  Chip,
  IconButton,
  Tab,
  Tabs,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Pagination,
} from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import LabelIcon from '@mui/icons-material/Label';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Kicker = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontSize: '0.6875rem',
  marginBottom: theme.spacing(0.5),
}));

const ContentSheet = styled(Paper)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.06)',
}));

const SheetHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${alpha('#c4c5d5', 0.25)}`,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  padding: theme.spacing(2, 4, 0),
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    minWidth: 80,
  },
  '& .MuiTab-root.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

const TableHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 180px 160px 120px',
  padding: theme.spacing(1.5, 4),
  backgroundColor: '#f2f4f6',
}));

const TableHeaderCell = styled(Typography)(({ theme }) => ({
  fontSize: '0.6875rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  color: theme.palette.text.secondary,
}));

const TableRow = styled(Box, {
  shouldForwardProp: (p) => p !== 'isLast',
})<{ isLast?: boolean }>(({ theme, isLast }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 180px 160px 120px',
  padding: theme.spacing(2.5, 4),
  alignItems: 'center',
  borderBottom: isLast ? 'none' : `1px solid ${alpha('#c4c5d5', 0.18)}`,
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: alpha('#f2f4f6', 0.8),
  },
}));

const StatusChip = styled(Chip)<{ statustype: 'published' | 'draft' }>(({ statustype }) => ({
  fontWeight: 700,
  fontSize: '0.6875rem',
  letterSpacing: '0.04em',
  height: 26,
  borderRadius: 6,
  ...(statustype === 'published'
    ? {
        backgroundColor: alpha('#0D9488', 0.12),
        color: '#005049',
      }
    : {
        backgroundColor: alpha('#c4c5d5', 0.35),
        color: '#444653',
      }),
}));

const CreateButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
  color: '#ffffff',
  fontWeight: 600,
  borderRadius: 10,
  textTransform: 'none',
  padding: '10px 20px',
  boxShadow: '0 4px 12px rgba(0, 40, 142, 0.25)',
  '&:hover': {
    background: 'linear-gradient(135deg, #001e72 0%, #1637a0 100%)',
    boxShadow: '0 6px 16px rgba(0, 40, 142, 0.35)',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f2f4f6',
    borderRadius: 10,
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

// ─── Types ────────────────────────────────────────────────────────────────────

type Prototype = 'User' | 'Driver' | 'Partner';
type Status = 'published' | 'draft';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  status: Status;
  prototype: Prototype;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialFaqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I update my payment method?',
    answer: 'To update your payment method, navigate to Settings > Payment Methods and add a new card or remove an existing one.',
    category: 'Payments',
    status: 'published',
    prototype: 'User',
  },
  {
    id: 2,
    question: 'What happens if a driver cancels my ride?',
    answer: 'If a driver cancels your ride, the system will automatically attempt to assign a new driver to your order.',
    category: 'General',
    status: 'draft',
    prototype: 'User',
  },
  {
    id: 3,
    question: 'Are my payment details secure?',
    answer: 'Yes, all payment details are encrypted and securely stored using industry-standard encryption protocols.',
    category: 'Payments',
    status: 'published',
    prototype: 'User',
  },
  {
    id: 4,
    question: 'How can I contact support?',
    answer: 'You can reach out to our 24/7 support team by navigating to the Help section in the app.',
    category: 'Support',
    status: 'published',
    prototype: 'User',
  },
  {
    id: 5,
    question: 'How do I become a driver?',
    answer: 'To become a driver, visit the driver registration portal and complete all required verifications.',
    category: 'Onboarding',
    status: 'published',
    prototype: 'Driver',
  },
  {
    id: 6,
    question: 'How are driver earnings calculated?',
    answer: 'Driver earnings are calculated based on distance, time, and any applicable bonuses or surge pricing.',
    category: 'Payments',
    status: 'published',
    prototype: 'Driver',
  },
  {
    id: 7,
    question: 'How do I register my restaurant?',
    answer: 'Restaurant registration is done via our partner portal. You will need to provide business documents for verification.',
    category: 'Onboarding',
    status: 'draft',
    prototype: 'Partner',
  },
  {
    id: 8,
    question: 'How do I track my restaurant revenue?',
    answer: 'Revenue tracking is available in the partner dashboard under the Analytics section.',
    category: 'General',
    status: 'published',
    prototype: 'Partner',
  },
];

const CATEGORIES = ['General', 'Payments', 'Support', 'Onboarding', 'Account'];
const PAGE_SIZE = 4;

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqManagementPage() {
  const [activePrototype, setActivePrototype] = useState<Prototype>('User');
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form state
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [formCategory, setFormCategory] = useState('General');
  const [formStatus, setFormStatus] = useState<Status>('draft');

  // ─── Filtering & Pagination ────────────────────────────────────────────────

  const filtered = faqs.filter(
    (f) =>
      f.prototype === activePrototype &&
      (f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleTabChange = (_: React.SyntheticEvent, val: number) => {
    const map: Prototype[] = ['User', 'Driver', 'Partner'];
    setActivePrototype(map[val]);
    setPage(1);
  };

  const openCreate = () => {
    setEditingFaq(null);
    setFormQuestion('');
    setFormAnswer('');
    setFormCategory('General');
    setFormStatus('draft');
    setModalOpen(true);
  };

  const openEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormCategory(faq.category);
    setFormStatus(faq.status);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formQuestion.trim() || !formAnswer.trim()) return;

    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingFaq.id
            ? { ...f, question: formQuestion, answer: formAnswer, category: formCategory, status: formStatus }
            : f
        )
      );
    } else {
      const newFaq: FAQ = {
        id: Date.now(),
        question: formQuestion,
        answer: formAnswer,
        category: formCategory,
        status: formStatus,
        prototype: activePrototype,
      };
      setFaqs((prev) => [...prev, newFaq]);
    }
    setModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deletingId !== null) {
      setFaqs((prev) => prev.filter((f) => f.id !== deletingId));
      if (paginated.length === 1 && page > 1) setPage((p) => p - 1);
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  };

  const protoIndex = ['User', 'Driver', 'Partner'].indexOf(activePrototype);

  return (
    <MainLayout>
      <PageHeader>
        <Kicker>Content Management</Kicker>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 800 }}>
            FAQ Management
          </Typography>
          <CreateButton startIcon={<AddIcon />} onClick={openCreate}>
            Create New FAQ
          </CreateButton>
        </Box>
      </PageHeader>

      {/* Search bar */}
      <Box sx={{ mb: 3 }}>
        <SearchField
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
          size="small"
          sx={{ width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <ContentSheet>
        {/* Tab header */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 4, pt: 3, pb: 0, gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mr: 1 }}>
            Prototype:
          </Typography>
          <StyledTabs value={protoIndex} onChange={handleTabChange}>
            <Tab label="User" id="tab-user" aria-controls="tabpanel-user" />
            <Tab label="Driver" id="tab-driver" aria-controls="tabpanel-driver" />
            <Tab label="Partner" id="tab-partner" aria-controls="tabpanel-partner" />
          </StyledTabs>
        </Box>

        {/* Section title */}
        <SheetHeader>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {activePrototype} FAQs
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </Typography>
        </SheetHeader>

        {/* Table Header */}
        <TableHeader>
          <TableHeaderCell>Question</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell sx={{ textAlign: 'right' }}>Actions</TableHeaderCell>
        </TableHeader>

        {/* Table Rows */}
        {paginated.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No FAQs found. Try adjusting your search or create a new one.
            </Typography>
          </Box>
        ) : (
          paginated.map((faq, idx) => (
            <TableRow key={faq.id} isLast={idx === paginated.length - 1}>
              {/* Question */}
              <Box sx={{ pr: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5, lineHeight: 1.4 }}
                >
                  {faq.question}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {faq.answer}
                </Typography>
              </Box>

              {/* Category */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <LabelIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                  {faq.category}
                </Typography>
              </Box>

              {/* Status */}
              <Box>
                <StatusChip
                  label={faq.status.toUpperCase()}
                  statustype={faq.status}
                  size="small"
                />
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => openEdit(faq)}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', backgroundColor: alpha('#00288e', 0.08) },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => confirmDelete(faq.id)}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'error.main', backgroundColor: alpha('#ba1a1a', 0.08) },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableRow>
          ))
        )}

        {/* Footer / Pagination */}
        <Box
          sx={{
            px: 4,
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fafbfc',
            borderTop: `1px solid ${alpha('#c4c5d5', 0.18)}`,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{' '}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </Typography>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              size="small"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 500,
                  fontSize: '0.8125rem',
                  borderRadius: 2,
                },
                '& .Mui-selected': {
                  background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%) !important',
                  color: '#fff !important',
                  fontWeight: 700,
                },
              }}
            />
          )}
        </Box>
      </ContentSheet>

      {/* ─── Create / Edit Modal ─────────────────────────────────────────────── */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(25, 28, 30, 0.12)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.125rem', pb: 1 }}>
          {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}>
          <TextField
            label="Question"
            value={formQuestion}
            onChange={(e) => setFormQuestion(e.target.value)}
            fullWidth
            required
            multiline
            rows={2}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f2f4f6' },
              '& fieldset': { border: 'none' },
              '& .Mui-focused fieldset': { border: '2px solid #00288e !important' },
            }}
          />
          <TextField
            label="Answer"
            value={formAnswer}
            onChange={(e) => setFormAnswer(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f2f4f6' },
              '& fieldset': { border: 'none' },
              '& .Mui-focused fieldset': { border: '2px solid #00288e !important' },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formCategory}
                label="Category"
                onChange={(e) => setFormCategory(e.target.value)}
                sx={{ borderRadius: 2, backgroundColor: '#f2f4f6' }}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formStatus}
                label="Status"
                onChange={(e) => setFormStatus(e.target.value as Status)}
                sx={{ borderRadius: 2, backgroundColor: '#f2f4f6' }}
              >
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setModalOpen(false)}
            sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <CreateButton onClick={handleSave} disabled={!formQuestion.trim() || !formAnswer.trim()}>
            {editingFaq ? 'Save Changes' : 'Create FAQ'}
          </CreateButton>
        </DialogActions>
      </Dialog>

      {/* ─── Delete Confirm Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, boxShadow: '0 20px 60px rgba(25, 28, 30, 0.12)' } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete FAQ?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. The FAQ will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
