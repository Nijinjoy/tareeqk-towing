import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';
import {
  assignRequest,
  deleteRequest,
  getAssignedRequests,
  TowingRequest,
} from '../services/requests';

export default function RequestsScreen() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<TowingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | number | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const isDriver = user?.role === 'driver';
  const customerName = user?.name?.trim().toLowerCase();

  useEffect(() => {
    let isMounted = true;
    let isFirstLoad = true;

    const loadRequests = async () => {
      if (isFirstLoad) {
        setIsLoading(true);
      }
      setError(null);
      try {
        const data = await getAssignedRequests();
        if (isMounted) {
          if (isDriver || !customerName) {
            setRequests(data);
          } else {
            setRequests(
              data.filter(
                (request) =>
                  request.customer_name?.trim().toLowerCase() === customerName,
              ),
            );
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load requests.');
        }
      } finally {
        if (isMounted && isFirstLoad) {
          setIsLoading(false);
          isFirstLoad = false;
        }
      }
    };

    loadRequests();
    const intervalId = setInterval(loadRequests, 2000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Requests" leftLabel="Back" onLeftPress={() => {}} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>
            {isDriver ? 'Assigned Requests' : 'My Requests'}
          </Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{requests.length}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          {isDriver
            ? 'Live updates from dispatch.'
            : 'Only requests submitted by you are shown.'}
        </Text>

        {isLoading ? (
          <View style={styles.stateWrap}>
            <ActivityIndicator color={COLORS.deepBlue} />
          </View>
        ) : error ? (
          <View style={styles.stateWrap}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.customerName}>{item.customer_name}</Text>
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                  {item.status ? (
                    <View style={styles.statusPill}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  ) : null}
                </View>
                {item.note ? (
                  <View style={styles.noteBlock}>
                    <Text style={styles.noteLabel}>Note</Text>
                    <Text style={styles.noteText}>{item.note}</Text>
                  </View>
                ) : (
                  <Text style={styles.notePlaceholder}>No special notes</Text>
                )}
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Request ID</Text>
                  <Text style={styles.metaValue}>#{item.id}</Text>
                </View>
                {isDriver ? (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={[
                        styles.assignButton,
                        assigningId === item.id && styles.assignButtonDisabled,
                      ]}
                      activeOpacity={0.85}
                      disabled={assigningId === item.id}
                      onPress={async () => {
                        setAssigningId(item.id);
                        try {
                          await assignRequest(item.id);
                          setRequests((prev) =>
                            prev.map((req) =>
                              req.id === item.id
                                ? { ...req, status: 'assigned' }
                                : req,
                            ),
                          );
                        } catch {
                          setError('Unable to assign request.');
                        } finally {
                          setAssigningId(null);
                        }
                      }}
                    >
                      <Text style={styles.assignButtonText}>
                        {assigningId === item.id
                          ? 'Assigning...'
                          : 'Accept Request'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.deleteButton,
                        deletingId === item.id && styles.assignButtonDisabled,
                      ]}
                      activeOpacity={0.85}
                      disabled={deletingId === item.id}
                      onPress={async () => {
                        setDeletingId(item.id);
                        try {
                          await deleteRequest(item.id);
                          setRequests((prev) =>
                            prev.filter((req) => req.id !== item.id),
                          );
                        } catch {
                          setError('Unable to delete request.');
                        } finally {
                          setDeletingId(null);
                        }
                      }}
                    >
                      <Text style={styles.deleteButtonText}>
                        {deletingId === item.id ? 'Deleting...' : 'Delete'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.stateWrap}>
                <Text style={styles.emptyText}>No active requests yet.</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: COLORS.deepBlue,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#5f7280',
    fontFamily: FONTS.regular,
  },
  pill: {
    backgroundColor: '#eef3f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pillText: {
    color: COLORS.deepBlue,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  listContent: {
    paddingTop: 18,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8ed',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    color: COLORS.deepBlue,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  location: {
    color: '#5f7280',
    fontSize: 13,
    marginTop: 4,
    fontFamily: FONTS.regular,
  },
  statusPill: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    backgroundColor: '#e9f2ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    color: '#2d5aa6',
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  noteBlock: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },
  noteLabel: {
    color: '#6b7c88',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: FONTS.regular,
  },
  noteText: {
    marginTop: 6,
    color: COLORS.deepBlue,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONTS.regular,
  },
  notePlaceholder: {
    color: '#9aa8b3',
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metaLabel: {
    color: '#6b7c88',
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  metaValue: {
    color: COLORS.deepBlue,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  assignButton: {
    flex: 1,
    backgroundColor: COLORS.deepBlue,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  assignButtonDisabled: {
    opacity: 0.7,
  },
  assignButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#fbeaea',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#b42318',
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
  stateWrap: {
    paddingTop: 36,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7c88',
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
  errorText: {
    color: '#b42318',
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
});
